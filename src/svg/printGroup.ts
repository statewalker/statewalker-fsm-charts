export function printGroup<T>({
  println, action,
}: {
  println: (str: string) => void;
  action: (d: T, i: number) => void;
}) {
  return (data: T[]) => {
    println("<g>");
    data.forEach(action);
    println("</g>");
  };
}
