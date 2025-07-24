import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  return (
    <div className={clsx(className, "mx-auto w-full max-w-[940px]")}>
      {children}
    </div>
  );
};

export default Container;
