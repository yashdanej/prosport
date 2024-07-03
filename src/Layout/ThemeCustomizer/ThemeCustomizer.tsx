import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../ReduxToolkit/Hooks';
import NavCustomizer from './NavCustomizer/NavCustomizer';
import TabCustomizer from './TabCustomizer/TabCustomizer';
import { setOpenCus } from '../../ReduxToolkit/Reducers/ThemeCustomizerSlice';

const ThemeCustomizer = () => {
  const [selected, setSelected] = useState("sidebar-type");
  const { openCus } = useAppSelector((state)=>state.themeCustomizer)
  const dispatch = useAppDispatch()

  const callbackNav = (select: string, open: boolean) => {
    setSelected(select);
    dispatch(setOpenCus(open));
  };
  return (
    <>
        <div className={`customizer-links ${openCus ? 'open' : ''}`}>
            <NavCustomizer callbackNav={callbackNav} selected={selected} />
        </div>
        <div className={`customizer-contain ${openCus ? 'open' : ''}`}>
            <TabCustomizer selected={selected} callbackNav={callbackNav} />
        </div>
    </>
  )
}

export default ThemeCustomizer