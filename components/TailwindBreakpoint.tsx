export const TailwindBreakpoints: React.FC = () => {
  return (
    <div className="p-2 font-sm rounded-lg uppercase h-10 w-10 flex items-center justify-center">
      <span className="flex sm:hidden">base</span>
      <span className="hidden sm:flex md:hidden">sm</span>
      <span className="hidden md:flex lg:hidden">md</span>
      <span className="hidden lg:flex xl:hidden">lg</span>
      <span className="hidden xl:flex 2xl:hidden">xl</span>
    </div>
  );
};
