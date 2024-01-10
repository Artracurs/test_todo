import s from './StatusIcon.module.scss'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Props = {
    status: string
}

export default function StatusIcon({status}: Props) {
  return (
    <div className={s.container} >
      {status === 'completed' ? <CheckCircleIcon className={s.el} style={{ color: '#1fc3ff' }}/>  : <CheckCircleOutlineIcon  className={s.el} /> }
      {/* {status === 'completed' && <CheckCircleIcon style={{ color: '#FF6D1F' }}/>} */}
      {status === 'in progress' && <PublishedWithChangesIcon className={s.el} />}
      {/* {status === 'pending' && <CheckCircleOutlineOutlinedIcon />} */}
    </div>
  )
}