// import logo from './logo.svg';
import './App.css';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import { useRef, useEffect } from 'react';
registerAllModules();
function App() {
  const hotTableComponentRef = useRef(null);
  useEffect(() => {
    const handsontableInstance = hotTableComponentRef.current.hotInstance;
    const filterField = document.querySelector('#filterField');

    const keyUpHandler = function (event) {
        const filtersPlugin = handsontableInstance.getPlugin('filters');
        const columnSelector = document.getElementById('columns');
        const columnValue = columnSelector.value;

        if (filtersPlugin) {
            filtersPlugin.removeConditions(columnValue);
            filtersPlugin.addCondition(columnValue, 'contains', [event.target.value]);
            filtersPlugin.filter();
            handsontableInstance.render();
        }
    };

    filterField.addEventListener('keyup', keyUpHandler);

    // Cleanup function to remove the event listener
    return () => {
        filterField.removeEventListener('keyup', keyUpHandler);
    };
}, []);
  function getRandomDate() {
    const start = new Date(1970, 0, 1); // Start date (adjust as needed)
    const end = new Date(); // Today's date as end date (you can set a specific end date if needed)
    
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    // Format the date to yyyy-mm-dd
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
let dummyData = [];
for (let i = 0; i < 10; i++) {
    let row = {
        id: i + 1, // Assuming IDs start from 1
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        dob: getRandomDate(),
        accountType: `AccountType_${i + 1}`,
        status: `Status_${i + 1}`,
        avatar: `Avatar_${i + 1}.jpg`,
        companyId: i % 3 + 1, // Assigning companyId as per a pattern
    };
    dummyData.push(row);
}
  return (
    <div className="App">
       <div class="controlsQuickFilter">
        <label for="columns" class="selectColumn">
          Select a column:{' '}
        </label>
        <select name="columns" id="columns">
          <option value="0">Id</option>
          <option value="1">Name</option>
          <option value="2">Email</option>
          <option value="3">D.O.B</option>
          <option value="4">Status</option>
        </select>
      </div>
      <div class="controlsQuickFilter">
        <input id="filterField" type="text" placeholder="Filter" />
      </div>
      <HotTable
      ref={hotTableComponentRef}
      data={dummyData}
      columns={[
        {
          title: 'Id',
          type: 'numeric',
          data: 'id',
          numericFormat: {
            pattern: '0',
          }
        },
        {
          title: 'Name',
          type: 'text',
          data: 'name',
        },
        {
          title: 'Email',
          type: 'text',
          data: 'email',
        },
        {
          title: 'D.O.B',
          type: 'date',
          data: 'dob',
          dateFormat: 'YYYY MMM, D',
          correctFormat: true,
          className: 'htRight',
        },
        {
          title: 'Status',
          type: 'text',
          data: 'status',
        },
        {
          title: 'Company Id',
          type: 'numeric',
          data: 'companyId',
          numericFormat: {
            pattern: '0',
          }
        },
        {
          title: 'Avatar',
          type: 'text',
          data: 'avatar',
          timeFormat: 'hh:mm A',
          correctFormat: true,
          className: 'htRight',
        },
      ]}
      hiddenColumns={{
        columns: [0, 5],
        // indicators: true,
      }}
      filters={true}
      readOnly={true}
      height="auto"
      className="exampleQuickFilter"
      licenseKey="non-commercial-and-evaluation"
    />
    </div>
  );
}

export default App;
