import React from 'react';

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{x: 0, y: 30.12}, {x: 1, y: 32.10}, {x: 2, y: 30.09}, {x: 3, y: 30.99}, {x: 4, y: 31.99}, {x: 5, y: 53.99}, {x: 6, y: 40.20}, {x: 7, y: 32.12}, {x: 8, y: 32.10}, {x: 9, y: 31.09}, {x: 10, y: 32.99}, {x: 11, y: 36.99}, {x: 12, y: 54.99}, {x: 13, y: 40.20}]
        }
    }

// GET MAX & MIN X
//x min and max are the first and last values in the data array
  getMinX() {
    const {data} = this.state;
    return data[0].x;
  }
  getMaxX() {
    const {data} = this.state;
    return data[data.length - 1].x;
  }

// GET MAX & MIN Y
//a function that reduces the input data array and returns a minimum y value
  getMinY() {
    const {data} = this.state;
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
  }
  //a function that reduces the input data array and returns a maximum y value
  getMaxY() {
    const {data} = this.state;
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }

  //if y at max X is +, market = BULL
  //if y at max X is -, market = BEAR

  //LINE CHART COORDINATE HELPER FUNCTIONS

  //a function that creates an x coordinate point
  getSvgX(x) {
    const {svgWidth} = this.props;
    return (x / this.getMaxX() * svgWidth);
  }

  //a function that creates an y coordinate point
  getSvgY(y) {
    const {svgHeight} = this.props;
    console.log(svgHeight);
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }

  //MAKE PATH
  //a function that creates the svg line graph by generating the html path
  makePath() {
    const {data} = this.state;
    const {color} = this.props;
    console.log(data);
    let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
    pathD += data.map((point) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });

        return (
            <path className="stock_chart_path" d={pathD} style={{stroke: color, strokeWidth: 3, fill: "none"}} />
        );

    }


    //Create Data Point Line
    makeDottedLine() {
        const minX = this.getMinX()
        const maxX = this.getMaxX();
        const minY = 0;
      return (
          <g className="stock_chart_line">
            <line
              style={{stroke: "black", strokeWidth: 2, fill: "none", strokeDasharray:"1, 48.286", strokeDashoffset: 0}}
              x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
              x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
          </g>
          );
        }

    render() {
        const {svgHeight, svgWidth} = this.props;
        return (
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="676" height="196">
                {this.makePath()}
                {this.makeDottedLine()}
              </svg>
            );
    }
}

LineChart.defaultProps = {
  data: [],
  color: '#21CE99',
  svgHeight: 196,
  svgWidth: 676
}

  export default LineChart;