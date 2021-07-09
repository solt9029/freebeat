import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles(() => ({
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '1rem',
  },
  field: {
    width: '100%',
  },
  img: {
    borderRadius: '1.5%',
    width: '100%',
  },
  card: {
    width: '100%',
  },
  button: {
    justifyContent: 'flex-start',
  },
}))

type Props = {
  youtubeVideoId: string
  youtubeVideoTitle?: string
}

function YoutubeCard(props: Props) {
  const classes = useStyles()

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12} zeroMinWidth>
            <img
              src={`https://i.ytimg.com/vi/${props.youtubeVideoId}/mqdefault.jpg`}
              className={classes.img}
            />
          </Grid>
          <Grid item sm={9} xs={12} zeroMinWidth>
            <div className={classes.title}>{props.youtubeVideoTitle}</div>
            <TextField className={classes.field} label="BPM" />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" fullWidth className={classes.button}>
          <DeleteOutlined />
          プレイリストから削除
        </Button>
      </CardActions>
    </Card>
  )
}

export default YoutubeCard
