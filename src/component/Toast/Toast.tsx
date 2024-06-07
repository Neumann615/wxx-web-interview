import {useEffect, useState} from "react"
import {createPortal} from "react-dom";
import {createRoot} from "react-dom/client";
import "./Toast.css"

const TOAST_CONTAINER_ID = 'wxx-toast-container';

interface ToastProps {
    message: string | React.ReactNode
    duration: number
}

function Toast(props: ToastProps) {
    const {message, duration} = props
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, duration)
        return () => clearTimeout(timer)
    }, [duration])

    return visible ? createPortal(
        <div className="wxx-toast">
            <img src={"/logo_small.png"}/>
            <div className={"text"}> {message}</div>
            <img src={"/logo_small.png"}/>
        </div>,
        document.getElementById(TOAST_CONTAINER_ID)
    ) : null
}

const showToast = (message, duration = 3000) => {
    // 确保容器存在
    if (!document.getElementById(TOAST_CONTAINER_ID)) {
        const container = document.createElement('div');
        container.id = TOAST_CONTAINER_ID;
        document.body.appendChild(container);
    }

    const root = createRoot(document.getElementById(TOAST_CONTAINER_ID));
    root.render(<Toast message={message} duration={duration}/>);
};


export {showToast, Toast}