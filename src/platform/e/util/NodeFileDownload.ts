// tslint:disable-next-line:no-var-requires
// @ts-ignore
// import request from 'request';
import fs from 'fs';

export default class NodeFileDownload {

    public downloadFile(url: string,
                        targetPath: string,
                        onEnd: () => void,
                        onError: () => void,
                        onProgress: (total: number, loaded: number) => void,
                        onSpeed?: (size: number, millisecond: number) => void) {
        const request = require('request');
        // Save variable to know progress
        let loaded = 0;
        let total = 0;


        let lastTime = 0;
        let speedSize = 0;

        // const req = request({
        //     method: 'GET',
        //     uri: url,
        // });

        const out = fs.createWriteStream(targetPath);
        const req = request(url);
        req.pipe(out);
        req.on('close', () => {
            // console.log('end');
        });

        req.on('error', () => {
            if (typeof onError === 'function' && onError) {
                onError();
            }
        });

        // const req = request(url);
        // req.pipe(out);
        // // .pipe(out);
        req.on('response', (data: { headers: { [x: string]: string; }; }) => {
            // Change the total bytes value to get progress later.
            // tslint:disable-next-line:radix
            total = parseInt(data.headers['content-length']);
        });

        const hasSpeed = (typeof onSpeed === 'function');
        const hasProgress = (typeof onProgress === 'function');

        req.on('data', (chunk: string | any[]) => {
            // Update the received bytes
            loaded += chunk.length;
            speedSize += chunk.length;
            // const size = chunk.length;
            const time = new Date().getTime();
            if (lastTime === 0) {
                lastTime = time;
            } else {
                const v = time - lastTime;
                if (v >= 1000) {
                    lastTime = time;
                    if (hasSpeed && onSpeed) {
                        onSpeed(speedSize, v);
                    }
                    if (hasProgress && onProgress) {
                        onProgress(total, loaded);
                    }
                    speedSize = 0;
                }
            }
        });

        req.on('end', () => {
            if (typeof onEnd === 'function' && onEnd) {
                onEnd();
            }
        });
    }
}
