import s from './StatusIcon.module.scss'

import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import UpdateIcon from '@mui/icons-material/Update';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';

type Props = {
  status: string;
  onClick?: () => void;
}

export default function StatusIcon({status, onClick}: Props) {
  return (
    <div className={s.container} >
      {/* {status === 'completed' ? <CheckCircleIcon onClick={onClick} className={s.el} />  : <></> } */}
      {status === 'completed' && <RadioButtonCheckedOutlinedIcon />}
      {status === 'in progress' && <RotateRightOutlinedIcon onClick={onClick} className={s.el} />}
      {status === 'pending' && <RadioButtonUncheckedOutlinedIcon  />}
    </div>
  )
}