import React, {useState, useEffect, useRef} from 'react'
import {isEmptyArray, lastItem} from './arrayUtils';

type Option = {
  value: string,
  label: string
}

const options: Option[] = [
  {value: '111', label: '111'},
  {value: '222', label: '222'},
  {value: '333', label: '333'},
  {value: '444', label: '444'},
  {value: '555', label: '555'},
  {value: '666', label: '666'},
  {value: '777', label: '777'},
  {value: '888', label: '888'},
]

function isInSelectView(option: HTMLOptionElement): boolean {
  const select = option.parentElement as HTMLSelectElement;
  const optionTopToSelect = option.offsetTop - select.offsetTop;
  return (select.scrollTop < (optionTopToSelect + option.offsetHeight))
    && (select.scrollTop + select.clientHeight > optionTopToSelect)
}

function scrollToSelectedOption(option: HTMLOptionElement) {
  console.log('> scrollToSelectedOption', option)
  const select = option.parentElement as HTMLSelectElement;
  select.scrollTop = option.offsetTop - select.offsetTop;
  console.log('select.scrollTop', select.scrollTop);
}

export default function Hello() {
  const [selectedValues, setSelectedValues] = useState<string []>([]);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const select = selectRef.current;
    if (select && !isEmptyArray(selectedValues)) {
      const lastValue = lastItem(selectedValues);
      const lastSelectedOption = Array.from(select.options).find(it => it.value === lastValue)
      console.log("### lastSelectedOption", lastSelectedOption);
      if (lastSelectedOption) {
        console.log('isInSelectedView: ', isInSelectView(lastSelectedOption))
        if (!isInSelectView(lastSelectedOption)) {
          scrollToSelectedOption(lastSelectedOption);
        }
      }
    }
  }, [selectedValues]);

  function selectAndScroll(value: string) {
    setSelectedValues(values => [...values, value]);
  }

  return <div>
    <h1>Scroll To Last Matched Option</h1>
    <div>
      <div>
        <span>{selectedValues.join(',')}</span>
      </div>
      <div>
        <select multiple value={selectedValues} size={5} ref={selectRef}>
          {
            options.map(({value, label}) =>
              <option key={value} value={value}>{label}</option>)
          }
        </select>
      </div>
      <div>
        <button onClick={() => selectAndScroll('111')}>111</button>
        <button onClick={() => selectAndScroll('333')}>333</button>
        <button onClick={() => selectAndScroll('555')}>555</button>
        <button onClick={() => selectAndScroll('888')}>888</button>
      </div>
    </div>
  </div>
};
