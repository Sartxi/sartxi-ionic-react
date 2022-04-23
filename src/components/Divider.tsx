interface Divider {
    text?: string;
    size?: string;
}

export const Divider = ({ text = "", size = "small" }: Divider) => {
    return (
        <div className="vinfo-divider"><strong className={size}>{text}</strong></div>
    )
}