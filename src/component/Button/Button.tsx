import "./Button.css"

interface ButtonProps {
    children: React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
    const {onClick, children} = props
    return <button className={"wxx-button"} onClick={onClick}>
        {children}
    </button>
}

export {Button}