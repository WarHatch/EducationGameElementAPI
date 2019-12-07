import React from "react"
// import uniqueId, { resetUniqueIds } from "react-html-id";

// TODO: remove if unused
class DataSetWithUniqueIds<P, S> extends React.Component {
  constructor() {
    super(null);

    // uniqueId.enableUniqueIds(this)
  }

  // componentWillMount() {
  //     resetUniqueIds()
  // }

  render() {
      return this.props.children;
  }
}

export default DataSetWithUniqueIds;
