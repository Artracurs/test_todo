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
  id: string,
  onClick?: () => void;
}

export default function StatusIcon({ status, id, onClick }: Props) {
  return (
      <div className={s.container}>
          {status === 'completed' && <RadioButtonCheckedOutlinedIcon />}
          {status === 'in progress' && <RotateRightOutlinedIcon onClick={() => onClick(id, 'completed')} className={s.el} />}
          {status === 'pending' && <RadioButtonUncheckedOutlinedIcon onClick={() => onClick(id, 'in progress')} className={s.el} />}
      </div>
  );
}
