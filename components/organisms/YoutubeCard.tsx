import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { Delete, DeleteOutline, DeleteOutlined } from '@material-ui/icons'
import React from 'react'
import YouTube from 'react-youtube'

type Props = {
  youtubeVideoId: string
  youtubeVideoTitle?: string
}

function YoutubeCard(props: Props) {
  return (
    <Card variant="outlined" style={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12} zeroMinWidth>
            <img
              src={`https://i.ytimg.com/vi/${props.youtubeVideoId}/mqdefault.jpg`}
              // height="100%"
              style={{ borderRadius: '1.5%', width: '100%' }}
            />
          </Grid>
          <Grid item sm={9} xs={12} zeroMinWidth>
            <div
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize: '1rem',
              }}
            >
              {props.youtubeVideoTitle}
            </div>
            <TextField style={{ width: '100%' }} label="BPM" />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">
          <DeleteOutlined />
          プレイリストから削除
        </Button>
      </CardActions>
    </Card>
  )
}

export default YoutubeCard
