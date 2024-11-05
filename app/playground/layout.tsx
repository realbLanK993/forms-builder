export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-w-[1040px] w-full">{children}</div>
    </div>
  );
}
