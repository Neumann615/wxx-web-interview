import "./TodoItem.css"

interface TodoItemProps {
    hasLine: boolean
    hasCheckbox: boolean
    checked: boolean
    disabled: boolean
    placeholder: string
    value: string | number
    extraDom?: React.ReactNode
    onChange: React.ChangeEventHandler
}


function TodoItem(props: TodoItemProps) {

    const {disabled, extraDom, placeholder, value, hasLine, checked, onClick, hasCheckbox, onChange} = props

    return <div {...props} className={"todo-item " + (hasLine ? "todo-item-line" : "")}>
        {hasCheckbox ? <input checked={checked} className={"checkbox"} type={"checkbox"}></input> : null}
        {disabled ? <div className={"readonly-bar"}>{value}</div> :
            <input placeholder={placeholder} className={"input-bar"} onChange={onChange} disabled={disabled}
                   value={value}></input>}
        {extraDom}
    </div>
}

TodoItem.defaultProps = {
    hasLine: false,
    hasCheckbox: true,
    checked: false,
    disabled: false,
    placeholder: "小诺小诺爱说词儿",
    value: ""
}

export {TodoItem, TodoItemProps}