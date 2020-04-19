export default interface DataChange<T> {
    change(count: T): void;
}
