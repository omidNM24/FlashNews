const recomended = (props) => {
  return (
    <div
      className="w-[300px] h-[200px] mb-[50px] flex flex-col items-left justify-end p-3 bg-cover cursor-pointer transition shadow-[inset_0_-100px_100px_-10px_rgba(0,0,0,0.905)] active:shadow-[inset_0_-100px_100px_-10px_rgba(0,0,0,0.800)] hover:shadow-[inset_0_-100px_100px_-10px_rgba(0,0,0,0.659)]"
      style={{
        backgroundImage: `url("${props.bgImage.url}")`,
      }}
    >
      <h1 className="text-lg text-w2 font-medium tracking-tight m-0 line-clamp-2 leading-tight">
        {props.title}
      </h1>
      <p className="text-sm mt-1 text-w5">{props.date}</p>
    </div>
  );
};

export default recomended;
