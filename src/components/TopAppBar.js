import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import MarkdownIcon from "./icons/MarkdownIcon";
import VSCodeDiffIcon from "./icons/VSCodeDiffIcon";

// Logo
import logo from "../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(2),
    minHeight: "10px",
    zIndex: 99999,
  },
  centerItems: {
    justifyContent: "space-between",
  },
  urlEdit: {
    justifyContent: "center",
    marginLeft: "500px",
    paddingBottom: "15px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "-5px",
    color: "inherit",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default function BackToTop(props) {
  const curTheme = props.curTheme;
  // const isEditing = props.isEditing;
  const [url, setUrl] = [props.url, props.setUrl];
  const readOnly = props.readOnly;
  // console.log(readOnly);
  const classes = useStyles();
  const invokeSave = props.invokeSave;
  const [language, setLanguage] = [props.language, props.setLanguage];
  const [isMarkdownView, updateIsMarkdownView] = [
    props.isMarkdownView,
    props.updateIsMarkdownView,
  ];
  const isSameContentbuid = props.isSameContentbuid;
  const base_url = props.base_url;
  // const setContentBuid = props.setContentBuid;

  const setReadOnly = props.setReadOnly;
  const [isDiff, setIsDiff] = [props.isDiff, props.setIsDiff];
  const [edited, setEdited] = [props.edited, props.setEdited];
  const [data, setOldData] = [props.data, props.setOldData];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        style={{
          background: curTheme === "light" ? "white" : "#363537",
          color: "inherit",
        }}
      >
        <Toolbar className={classes.centerItems}>
          <a
            href="base_url"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <img src={logo} alt={"lul.mx"} style={{ width: "100px" }} />
            {/* <Typography variant="h6">StagBIN</Typography> */}
          </a>
          <FormControl>
            <InputLabel style={{ color: "inherit" }} htmlFor="custom-url">
              URL
            </InputLabel>
            <Input
              id="custom-url"
              type="text"
              disabled={readOnly || edited ? true : false}
              value={url}
              onChange={(e) => {
                // console.log(e.target.value);
                setUrl(e.target.value);
              }}
              style={{ color: "inherit" }}
              endAdornment={
                readOnly ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cop"
                      color="inherit"
                      onClick={() => {
                        navigator.clipboard.writeText(base_url + "/" + url);
                      }}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                )
              }
            />
          </FormControl>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                style={{ color: "inherit" }}
                id="demo-simple-select-label"
              >
                Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ color: "inherit" }}
                value={language}
                aria-label="Select Language"
                onChange={(event) => {
                  setLanguage(event.target.value);
                }}
              >
                <MenuItem value="markdown">Markdown</MenuItem>
                <MenuItem style={{ color: "inherit" }} value="javascript">
                  Javascript
                </MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="go">Go Lang</MenuItem>
                <MenuItem value="html">HTML</MenuItem>
                <MenuItem value="css">CSS</MenuItem>
                <MenuItem value="cpp">C/C++</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </FormControl>
            {readOnly ? (
              <Tooltip title={"Download Contents"}>
                <IconButton
                style={{ marginTop: "5px" }}
                  edge="end"
                  color="inherit"
                  aria-label="Dowmload Contents"
                  onClick={() => {
                    const element = document.createElement("a");
                    element.style.display = "none";
                    const file = new Blob([data], {type: 'text/plain'});
                    element.href = URL.createObjectURL(file);
                    element.download = url;
                    document.body.appendChild(element); // Required for this to work in FireFox
                    element.click();
                  }}
                >
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {readOnly || language === "markdown" ? (
              <Tooltip title={"Markdown " + (readOnly ? "View" : "Preview")}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="Markdown Preview"
                  onClick={() => {
                    updateIsMarkdownView(!isMarkdownView);
                  }}
                >
                  <MarkdownIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {edited ? (
              <Tooltip title="View Differences">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="Difference"
                  onClick={() => {
                    setIsDiff(!isDiff);
                  }}
                >
                  <VSCodeDiffIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {readOnly ? (
              isSameContentbuid ? (
                <Tooltip title="Edit">
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="Edit"
                    onClick={() => {
                      console.log(data);
                      setOldData((" " + data).slice(1));
                      setEdited(true);
                      setReadOnly(false);
                      console.log(readOnly);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )
            ) : (
              <Tooltip title="Save">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="Save"
                  onClick={invokeSave}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="New Paste">
              <IconButton
                edge="end"
                color="inherit"
                aria-label="New Paste"
                onClick={() => {
                  window.location.href = base_url;
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
