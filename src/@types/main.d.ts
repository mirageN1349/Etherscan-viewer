interface String {
  toString(n: number): string;
}

interface ObjectConstructor {
  keys<T>(o: T): (keyof T)[];
  entries<T>(o: T): Array<[keyof T, T[keyof T]]>;
}
