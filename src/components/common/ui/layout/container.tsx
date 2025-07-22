type Props = {
  children: React.ReactNode;
  className?: string;
}


const Container =  ({
  children,
  className = ""
}: Props) => {
  return (
    <div className={`mx-auto w-full max-w-[940px] ${className}`}>
      {children}
    </div>
  )
}

export default Container;