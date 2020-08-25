class EnvConfig {

    private dev: string = 'http://127.0.0.1:10000';
    private test: string = 'http://127.0.0.1:10000';
    private pro: string = 'http://119.3.30.190:10000';
    // private pro: string = 'http://im.kudouyun.cn:10000';

    public getBaseUrl(): string {
        let url = this.pro;
        if (process.env.NODE_ENV === 'development') {
            url = this.dev;
        } else if (process.env.NODE_ENV === 'test') {
            url = this.test;
        } else if (process.env.NODE_ENV === 'production') {
            url = this.pro;
        }
        return url;
    }
}

export default new EnvConfig();
