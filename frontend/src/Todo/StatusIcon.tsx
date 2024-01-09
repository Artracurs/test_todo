import s from './StatusIcon.module.scss'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

type Props = {
    status: string
}

export default function StatusIcon({status}: Props) {
  return (
    <div className={s.container}>
      {status === 'completed' && <CheckCircleIcon />}
      {status === 'in progress' && <PublishedWithChangesIcon />}
      {status === 'pending' && <CheckCircleOutlineOutlinedIcon />}
    </div>
  )
}