import React from "react"
import { Link } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStaticQuery, graphql } from "gatsby"

const ListLink = props => (
    <li>
        <Link to={props.to}>{props.children}</Link>
    </li>
)


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Header({ children }) {

    const data = useStaticQuery(
        graphql`
            query {
                site {
                siteMetadata {
                    title
                }
                }
            }
        `
    )
    const classes = useStyles();



    return (
        /*         <header>
                    <ul>
                        <ListLink  to="/">World Wide FM</ListLink>
                        <ListLink to="/about/">About {data.site.siteMetadata.title}</ListLink>
                        <ListLink to="/my-files/">Countries</ListLink>
                    </ul>
                </header>  */
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} >
                    World Wide FM
                </Typography>
                <Button color="inherit">Countries</Button>
            </Toolbar>
        </AppBar>
    )
}
