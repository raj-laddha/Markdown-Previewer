marked.setOptions({
  breaks: true,
  highlight: (code, lang) => {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    } else {
      return code;
    }
  },
  smartLists: true });


const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank" title="${title}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markDown: defaultMarkdown,
      layoutSingle: true,
      editorExpanded: false,
      previewerExpanded: false };


    this.handleChange = this.handleChange.bind(this);
    this.handleLayout = this.handleLayout.bind(this);
    this.handleEditLayout = this.handleEditLayout.bind(this);
    this.handlePreviewLayout = this.handlePreviewLayout.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    this.setState({
      markDown: e.target.value });

  }

  handleLayout(e) {
    this.setState({
      layoutSingle: !this.state.layoutSingle });

  }

  handleEditLayout(e) {
    this.setState({
      editorExpanded: !this.state.editorExpanded });

  }

  handlePreviewLayout(e) {
    this.setState({
      previewerExpanded: !this.state.previewerExpanded });

  }

  handleClear(e) {
    this.setState({
      markDown: '' });

  }

  render() {

    let flexDisplay = this.state.layoutSingle ?
    "d-flex justify-content-center align-items-center flex-column" :
    "d-flex justify-content-around align-items-center flex-row";

    let wrapperClasses = "d-flex flex-column justify-content-center wrap-tool";

    let btnClasses = "btn btn-info float-end";

    let layoutBtnClass;
    let editorLogo;
    let previewerLogo;
    let editWrapper;
    let previewWrapper;
    let layoutClassEditor;
    let layoutClassPreview;

    if (this.state.editorExpanded) {
      editorLogo = "fas fa-compress";
      editWrapper = wrapperClasses + " expand-box";
      previewWrapper = "hide";

      layoutClassEditor = this.state.layoutSingle ?
      "single-layout-edit height-full" :
      "double-layout height-full";

      layoutBtnClass = "hide";

    } else if (!this.state.previewExpanded) {
      editorLogo = "fas fa-expand";
      editWrapper = wrapperClasses;

      layoutClassEditor = this.state.layoutSingle ?
      "single-layout-edit height-custom" :
      "double-layout height-full";

      layoutBtnClass = btnClasses;
    }

    if (this.state.previewerExpanded) {
      previewerLogo = "fas fa-compress";
      previewWrapper = wrapperClasses + " expand-box";
      editWrapper = "hide";

      layoutClassPreview = this.state.layoutSingle ?
      "single-layout-view height-auto" :
      "double-layout height-auto";

      layoutBtnClass = "hide";

    } else if (!this.state.editorExpanded) {
      previewerLogo = "fas fa-expand";
      previewWrapper = wrapperClasses;

      layoutClassPreview = this.state.layoutSingle ?
      "single-layout-view height-custom" :
      "double-layout height-full";

      layoutBtnClass = btnClasses;
    }

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { className: "text-center main-head" }, "Markdown Previewer", /*#__PURE__*/

      React.createElement("button", {
        className: layoutBtnClass,
        id: "layout-btn",
        onClick: this.handleLayout }, "Change layout")), /*#__PURE__*/





      React.createElement("div", { className: flexDisplay }, /*#__PURE__*/
      React.createElement("div", { className: editWrapper }, /*#__PURE__*/
      React.createElement(ToolBar, {
        text: "Editor",
        logo: "fas fa-edit",
        exComLogo: editorLogo,
        handleExpansion: this.handleEditLayout,
        clearButton: "true",
        onClear: this.handleClear }), /*#__PURE__*/

      React.createElement(Editor, {
        markDown: this.state.markDown,
        onChange: this.handleChange,
        className: layoutClassEditor })), /*#__PURE__*/


      React.createElement("div", { className: previewWrapper }, /*#__PURE__*/
      React.createElement(ToolBar, {
        text: "Previewer",
        logo: "fas fa-laptop-code",
        exComLogo: previewerLogo,
        handleExpansion: this.handlePreviewLayout }), /*#__PURE__*/

      React.createElement(Previewer, {
        preview: this.state.markDown,
        className: layoutClassPreview })))));





  }}


const ToolBar = props => {

  let clearBtn = props.clearButton == "true" ? /*#__PURE__*/React.createElement("button", { className: "btn btn-sm clear-btn", onClick: props.onClear }, "Clear Editor") : /*#__PURE__*/React.createElement("div", null);

  return /*#__PURE__*/(
    React.createElement("div", { className: "d-flex flex-row justify-content-between tool-opts" }, /*#__PURE__*/
    React.createElement("div", { className: "d-flex flex-row" }, /*#__PURE__*/
    React.createElement("i", { className: props.logo + " logo" }), /*#__PURE__*/
    React.createElement("p", { className: "box-name" }, props.text),
    clearBtn), /*#__PURE__*/

    React.createElement("i", { className: props.exComLogo + " logo",
      onClick: props.handleExpansion })));


};

const Editor = props => {
  return /*#__PURE__*/(
    React.createElement("textarea", {
      id: "editor",
      type: "text",
      placeholder: "Enter Markdown",
      onChange: props.onChange,
      value: props.markDown,
      className: props.className }));


};

const Previewer = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: marked(props.preview, { renderer: renderer }) },

      id: "preview",
      className: props.className }));


};

const defaultMarkdown = `# Markdown Previewer
---

# This is a header 
---
## This is a sub header
---
Here is an example of a [link to google](https://www.google.com)

inline code \`<html></html>\`

****A code block**** 
\`\`\` javascript
// this is a javascript code snippet

function addTen (element) {
  var ten = 10;
  return (element + ten);
}
\`\`\`

> This is how to write a block quote

***An unordered list***
- Item 1
  - Sub-item 1
- Item 2
- Item 3

***An ordered list***
1. Item 1
1. Item 2
1. Item 3

****Finally an image****
![Web development](https://www.htmlden.com/wp-content/themes/ks/img/web-developer-master-tn.svg)
`;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));