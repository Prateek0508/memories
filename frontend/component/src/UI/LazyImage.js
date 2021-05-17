import Image from "next/image";

export default function LazyImage({ src, size, alt, className, style }) {
    const [width, height] = size;
    return (
        <div className={className} style={style}>
            <Image
                src={src}
                width={width}
                height={height}
                layout="responsive"
                alt={alt ? alt : ""}
            />
        </div>
    );
}

{/* <LazyImage src="/" size={[4234, 534]} />; */ }
