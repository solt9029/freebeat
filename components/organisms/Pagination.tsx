import { makeStyles } from '@material-ui/core'
import MaterialPagination from '@material-ui/lab/Pagination'
import { useRouter } from 'next/dist/client/router'

const useStyles = makeStyles(() => ({
  pagination: {
    justifyContent: 'center',
    display: 'flex',
  },
}))

const Pagination = () => {
  const classes = useStyles()
  const router = useRouter()

  const handleChange = (event, page) => {
    router.push(`/playlists?page=${page}`)
  }

  return (
    <MaterialPagination
      className={classes.pagination}
      count={10}
      page={2}
      variant="outlined"
      color="secondary"
      onChange={handleChange}
    />
  )
}

export default Pagination
