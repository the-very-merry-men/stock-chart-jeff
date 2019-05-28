import React from 'react';

class LineChart extends React.Component {
    constructor(props) {
        super(props);

      this.state = {
      }
        this.getMinX = this.getMinX.bind(this);
        this.getMaxX = this.getMaxX.bind(this);
        this.getMinY = this.getMinY.bind(this);
        this.getMaxY = this.getMaxY.bind(this);
        this.getSvgX = this.getSvgX.bind(this);
        this.getSvgY = this.getSvgY.bind(this);

    }

// GET MAX & MIN X
//x min and max are the first and last values in the data array
  getMinX() {
    console.log('stockData', this.props.stockData);
    const data = this.props.stockData;
    if (data.length > 0) {
      return data[0].x;
    } else {
      return;
    }

  }
  getMaxX() {
    const data = this.props.stockData;
    if (data.length > 0) {
      return data[data.length - 1].x;
    } else {
      return;
    }
  }

// GET MAX & MIN Y
//a function that reduces the input data array and returns a minimum y value
  getMinY() {
    const data = this.props.stockData;
    if (data.length > 0) {
      return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
    }
  }

  //a function that reduces the input data array and returns a maximum y value
  getMaxY() {
    const data = this.props.stockData;
    if (data.length > 0) {
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
    } else {
      return;
    }
  }

  //LINE CHART COORDINATE HELPER FUNCTIONS

  //a function that creates an x coordinate point
  getSvgX(x) {
    const {svgWidth} = this.props;
    return (x / this.getMaxX() * svgWidth);
  }

  //a function that creates an y coordinate point
  getSvgY(y) {
    const {svgHeight} = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }

  //MAKE PATH
  //a function that creates the svg line graph by generating the html path
  makePath() {
    const data = this.props.stockData;
    if (!data.length) {
      return;
    } else {
      const {color} = this.props;
      let pathD = `M  ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `;
      pathD += data.map((point) => {
        return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `;
      });
          return (
              <path className="stock_chart_path" d={pathD} style={{stroke: color, strokeWidth: 3, fill: "none"}} />
          );
      }
  }

    //Create Data Point Line
    makeDottedLine() {
        const minX = this.getMinX();
        const maxX = this.getMaxX();
        const minY = this.getMinY();
        return (
          <g className="stock_chart_line">
            <line
              style={{stroke: "black", strokeWidth: 1, fill: "none", strokeDasharray:`1, ${676/(this.props.stockData.length)}`, strokeDashoffset: 0}}
              x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
              x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
          </g>
          );
      }

    render() {
        const {svgHeight, svgWidth} = this.props;
        const graph = this.props.stockData.length ? (<svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="676" height="196">
          {this.makePath()}
          {this.makeDottedLine()}
        </svg>) : (<div> Graph Currently Unavailable </div>);
        return (
            <div>
              {graph}
            </div>
        )
    }
}

LineChart.defaultProps = {
  data: [],
  color: '#21CE99',
  svgHeight: 196,
  svgWidth: 676
}

  export default LineChart;