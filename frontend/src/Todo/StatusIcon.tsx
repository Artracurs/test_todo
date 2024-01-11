import s from './StatusIcon.module.scss'
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
          {status === 'completed' && <RadioButtonCheckedOutlinedIcon className={s.el2}/>}
          {status === 'in progress' && <RotateRightOutlinedIcon onClick={() => onClick(id, 'completed')} className={s.el} />}
          {status === 'pending' && <RadioButtonUncheckedOutlinedIcon onClick={() => onClick(id, 'in progress')} className={s.el2}/>}
      </div>
  );
}
