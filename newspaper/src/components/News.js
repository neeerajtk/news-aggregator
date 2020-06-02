// import React from 'react'

// const News = ({newsItem}) => {
//     const {title,description,image,url} = newsItem;

//     return (
//         <div className="news_disp">
//             <h2>{title}</h2>
//             <img src={image} alt={title}/>
//             <a href={url}>Read More</a>
//             {/* <button>Read More...</button> */}
//         </div>
//     )
// }

// export default News




// ******** 


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
  typ:{
    textDecoration: "none",
    color: "#696969"	
  }
}));

function News(props) {
    console.log("inside news");
        
    console.log(props);
    
//   const {title,description,image,url} = props.newsItem;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Avatar
              alt={props.props.title}
              src="https://image.shutterstock.com/z/stock-vector-n-letter-linked-n-letter-circle-logo-n-o-and-o-n-letter-modern-design-vector-illustration-731097922.jpg"
            />
        }
        action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
        }
        title={
            props.props.title
        }
        subheader={props.props.publishedAt}
      />
      {
        <CardMedia
          className={classes.media}
          image={props.props.image}
          title="Ted talk"
        />
      }

      <CardContent>
        {
          <Typography variant="body2" color="textSecondary" component="p">
           {props.props.description}
           <br/>
            Source : {
            //    "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                props.props.source.name 
           }
           <br/>

         <a className={classes.typ} href = {props.props.url}>Read More</a>
          </Typography>
          
           
        }
      </CardContent>
    </Card>
  );
  return News;
}



export default News;

