import {useEffect, useRef, useState} from 'react'
import {TodoItem} from "./component/TodoItem/TodoItem"
import {ThemeSwitch} from "./component/ThemeSwitch/ThemeSwitch"
import {Button} from "./component/Button/Button"
import {showToast} from "./component/Toast/Toast"
import './App.css'

interface DataItem {
    id: string
    name: string
}

const testData: Array<DataItem> = [
    {
        id: "1",
        name: "小诺喜欢吃大🍉"
    },
    {
        id: "2",
        name: "小诺是一头小🐖"
    },
    {
        id: "3",
        name: "小诺喜欢吃🍒"
    },
    {
        id: "4",
        name: "小诺喜欢小🐏"
    },
    {
        id: "5",
        name: "小诺喜欢吃大🦞"
    },
    {
        id: "6",
        name: "小诺喜欢小🦆"
    }
]

function App() {
    const [dataList, setDataList] = useState<Array<DataItem>>(testData)
    const [selectedList, setSelectedList] = useState<Array<DataItem>>([])
    const [text, setText] = useState("")
    const listRef = useRef(null)
    const [isScroll, setIsScroll] = useState(false)

    function changeSelectStatus(dataItem: DataItem) {
        if (getIsSelected(dataItem.id)) {
            setSelectedList(selectedList.filter((item: DataItem) => item.id !== dataItem.id))
        } else {
            setSelectedList([...selectedList, dataItem])
        }
    }

    function changeAllSelectStatus(flag: boolean) {
        setSelectedList(flag ? dataList : [])
    }

    function getIsSelected(id: string): boolean {
        return selectedList.findIndex((item: DataItem) => item.id === id) !== -1
    }

    function addData() {
        setDataList((_dataList) => {
            return [..._dataList, {
                id: Date.now() + "wxx",
                name: text
            }]
        })
        setText("")
        showToast("添加成功", 2000)
        setIsScroll(true)
        console.log(listRef)
    }

    function deleteData() {
        if (!selectedList?.length) {
            showToast("请选择需要操作的项", 2000)
            return
        }
        let selectedDataMap = new Map<string, DataItem>()
        selectedList.forEach((item: DataItem) => {
            selectedDataMap.set(item.id, item)
        })
        setSelectedList([])
        setDataList((_dataList: Array<DataItem>) => {
            return _dataList.filter((dataItem: DataItem) => !selectedDataMap.has(dataItem.id))
        })
        showToast("删除成功", 2000)
    }

    function finish() {
        alert("我是选中的数据:" + JSON.stringify(selectedList))
    }

    useEffect(() => {
        if (isScroll && dataList?.length) {
            if (listRef.current) {
                listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
            }
        }
        return setIsScroll(false)
    }, [isScroll, dataList])

    return <div className={"home"}>
        <img className={"duck"} style={{left: "10px", top: "10px"}} src={"/duck4.jpg"}/>
        <img className={"duck"} style={{left: "50px", bottom: "10px", width: "200px"}} src={"/duck5.gif"}/>
        <img className={"duck"} style={{left: "380px", top: "50%", width: "200px"}} src={"/duck6.gif"}/>
        <img className={"duck"} style={{left: "50px", top: "35%", width: "230px", transform: "rotate(20deg)"}}
             src={"/duck8.gif"}/>
        <img className={"duck"} style={{left: "15%", transform: "rotate(30deg)"}} src={"/duck1.jpg"}/>
        <img className={"duck"} style={{left: "45%", width: "160px", transform: "rotate(100deg)"}} src={"/duck2.jpg"}/>
        <img className={"duck"} style={{right: "20%", top: "40%", width: "180px"}} src={"/duck9.jpg"}/>
        <img className={"duck"} style={{right: "300px", top: "10px", width: "150px"}} src={"/duck7.jpg"}/>
        <img className={"duck"} style={{right: "10px"}} src={"/home-logo2.webp"}/>
        <img className={"duck"} style={{right: "20px", bottom: "100px"}} src={"/duck3.gif"}/>
        <img className={"duck"} style={{right: "30%", bottom: "20px"}} src={"/duck11.jpg"}/>
        <img className={"duck"} style={{left: "20%", bottom: "60px", width: "150px"}} src={"/duck10.jpg"}/>
        <div className={"todo"}>
            <div className={"title"}>
                <div className={"left"}>TODO</div>
                <ThemeSwitch></ThemeSwitch>
            </div>
            <div className={"search"}>
                <TodoItem value={text} onChange={(e) => {
                    setText(e?.target?.value)
                }
                } hasCheckbox={false} extraDom={text?.length ? <Button onClick={addData}>添加</Button> : null}></TodoItem>
            </div>
            <div className={"list"}>
                <div className={"content"} ref={listRef}>
                    {dataList.map((item: DataItem) => {
                        return <TodoItem
                            checked={getIsSelected(item.id)}
                            onClick={() => {
                                changeSelectStatus(item)
                            }} hasLine value={item.name} key={item.id} disabled>
                        </TodoItem>
                    })}
                </div>
                <div className={"operation"}>
                    <div>当前选择项:{selectedList?.length + "/" + dataList?.length}</div>
                    <Button onClick={() => {
                        changeAllSelectStatus(true)
                    }
                    }>全选</Button>
                    <Button onClick={() => {
                        changeAllSelectStatus(false)
                    }
                    }>取消全选</Button>
                    <Button onClick={deleteData}>删除</Button>
                    <Button onClick={finish}>完成</Button>
                </div>
            </div>
        </div>
        <div className={"header"}></div>
        <div className={"main"}></div>
        <div className={"footer"}>
            <div className={"open"}>
                <div>Open</div>
                <div>Sandbox</div>
            </div>
        </div>
    </div>
}

export default App
