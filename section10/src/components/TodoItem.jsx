import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({
    id, 
    isDone, 
    content, 
    date, 
    onUpdate,
    onDelete
}) => {
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return (
        <div className="TodoItem">
         <input 
            onChange={onChangeCheckbox}
            readOnly 
            checked={isDone} 
            type="checkbox" 
        />
         <div className="content">{content}</div>
         <div className="date">
            {new Date(date).toLocaleDateString()}
        </div>
         <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    );
};

// export default memo(TodoItem, (prevProps, nextProps) => {
//     // 반환값에 따라, props가 변경되지 않은 것으로 판단
//     // true: 변경되지 않은 것으로 판단
//     // false: 변경된 것으로 판단
//     if (prevProps.isDone !== nextProps.isDone) {
//         return false; // isDone이 변경되었으므로, 렌더링
//     }
//     if (prevProps.content !== nextProps.content) {
//         return false; // content가 변경되었으므로, 렌더링
//     }
//     if (prevProps.date !== nextProps.date) {
//         return false; // date가 변경되었으므로, 렌더링
//     }
//     if (prevProps.id !== nextProps.id) {
//         return false; // id가 변경되었으므로, 렌더링
//     }
    
//     return true; // 모든 props가 동일하므로, 렌더링하지 않음
// });

export default memo(TodoItem);