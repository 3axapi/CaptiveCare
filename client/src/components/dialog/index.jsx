import { motion } from "framer-motion";
import "./main.css"

const Default = (props) => {

  const { layoutId, caption, onClose, content } = props;

  return <motion.div className="dialog" layoutId={layoutId}>
    <div className="dialog-content">
      <div className="dialog-header">
        <div style={{ minWidth: 20 }}></div>
        <h3>{caption}</h3>
        <button style={{ padding: "4px 8px", marginTop: "unset" }} onClick={() => onClose?.(null)}>X</button>
      </div>
      <div className="dialog-wrapper-content">
        {content}
      </div>
    </div>
  </motion.div>
}

export { Default as Dialog }