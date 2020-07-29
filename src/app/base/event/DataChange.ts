export default interface DataChange<T> {
    change(data: T): void;
}
