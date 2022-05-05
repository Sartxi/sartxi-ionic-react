import "./Components.scss";

export const Divider = ({ text = "", size = "small" }: APP.Divider) => {
    return (
        <div className="vinfo-divider"><strong className={size}>{text}</strong></div>
    )
}