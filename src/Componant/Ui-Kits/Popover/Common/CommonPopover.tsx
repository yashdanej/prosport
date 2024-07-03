import { useState } from 'react'
import { CommonPopoverProp } from '../../../../Types/Ui-Kits/UiKitsTypes';
import { Btn, Popovers } from '../../../../AbstractElements';

const CommonPopover:React.FC<CommonPopoverProp> = ({ item }) => {
  const [popover, setPopover] = useState(false);
  const toggle = () => setPopover(!popover);
  return (
    <>
      <Btn color={item.btnColor} className="example-popover" id={`${"Popover-" + item.id}`}>{item.btnText}</Btn>
      <Popovers placement={item.placement} isOpen={popover} target={"Popover-" + item.id} toggle={toggle} trigger={item.trigger} title={item.popoverHeader}>
        {item.popoverBody}
      </Popovers>
    </>
  )
}

export default CommonPopover