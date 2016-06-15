// Values for head of table
var labels = ["Model", "Make", "Total Built Number"];

// Values for first column of table
var countries = ["US", "UK", "USSR", "Germany", "Japan"];

// Values for second column of table
var planes = [
  ["P-51 Mustang", "North American Aviation", "15,000+"],
  ["Spitfire", "Supermarine", "20,351"],
  ["La-5", "Lavochkin", "9,920"],
  ["Bf 109", "Messerschmitt AG", "33,984"],
  ["A6M Zero", "Mitsubishi", "10,939"]
];



// React class for table
var myTable = React.createClass({
  propTypes: {
    countries: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    labels: React.PropTypes.arrayOf(
      React.PropTypes.string
    )
  },
  getInitialState: function() {
    return {
      planes: null
    };
  },
  displayPlane: function(event) {
    var index = null;
    switch(event.target.innerText) {
      case 'US':
        index = 0;
        break;
      case 'UK':
        index = 1;
        break;
      case 'USSR':
        index = 2;
        break;
      case 'Germany':
        index = 3;
        break;
      case 'Japan':
        index = 4;
        break;
      default:
        console.log(event.target.innerText);
    };
    this.setState({
      planes: planes[index]
    });
  },
  render: function() {
    var self = this;
    return (
      <table>
        <tr>
          <td onClick={self.displayPlane}>
            {self.props.countries.map(function(country, ind) {
              return <div id={ind} className="country">{country}</div>;
            })}
          </td>
          <td>
            <div className="label">
              {self.props.labels.map(function(label, ind) {
                return <div id={ind}>{label + ":"}</div>;
              })}
            </div>
            <div className="plane">
              {(function() {
                if(self.state.planes) {
                  return (self.state.planes.map(function(plane, ind) {
                           return (<div id={ind}>{plane}</div>);
                           })
                         );
                }
                else {
                  return null;
                }
              })()}
            </div>
          </td>
        </tr>
      </table>
    )
  }
});

// React app for table
React.render(
  React.createElement(myTable, {
    countries: countries,
    labels: labels
  }),
  document.getElementById('my-table')
);
