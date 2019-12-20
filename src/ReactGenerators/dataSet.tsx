import React from "react"

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
