import { numNode, LinkedList } from "./Lab1"
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lists: (LinkedList)[] = [];
let counter = 0;

function createNewList() {
  let list = new LinkedList();
  lists.push(list);
  console.log("\nList has been created, its index: " + counter);
  counter++;
}

function selectList() {
  rl.question("Enter the list index: ", (listIndexStr) => {
    const listIndex = parseInt(listIndexStr);
    if (listIndex >= 0 && listIndex < lists.length) {
      const selectedList = lists[listIndex];
      if (selectedList) {
        performAction(selectedList, listIndex);
      }
    } else {
      console.log("Invalid list index.");
      showMenu();
    }
  });
}

// Function to perform actions on a selected list
function performAction(selectedList: LinkedList, index: number) {
  showListMenu(selectedList, index);
}

// Function to perform actions based on user input for a selected list
function performListAction(selectedList: LinkedList, choice: string, index: number) {
  switch (choice) {
    case '1':
      rl.question("Enter the number to append: ", (input) => {
        const number = parseInt(input);
        if (!isNaN(number)) {
          selectedList.append(number);
          console.log("\nAppended " + number + " to the list.");
        } else {
          console.log("Invalid input. Please enter a valid number.");
        }
        showListMenu(selectedList, index);
      });
      break;
    case '2':
      rl.question("Enter the number to prepend: ", (input) => {
        const number = parseInt(input);
        if (!isNaN(number)) {
          selectedList.prepend(number);
          console.log("\nPrepended " + number + " to the list.");
        } else {
          console.log("Invalid input. Please enter a valid number.");
        }
        showListMenu(selectedList, index);
      });
      break;
    case '3':
      console.log(selectedList.isEmpty());
      showListMenu(selectedList, index);
      break;
    case '4':
      if (selectedList.isEmpty()) {
        console.log("\nList is empty.");
      } else {
        console.log("\nRemoved " + selectedList.removeLast() + " from the list.");
      }
      showListMenu(selectedList, index);
      break;
    case '5':
      if (selectedList.isEmpty()) {
        console.log("\nList is empty.");
      } else {
        console.log("\nRemoved " + selectedList.removeFirst() + " from the list.");
      }
      showListMenu(selectedList, index);
      break;
    case '6':
      rl.question("Enter the index of element to remove: ", (input) => {
        const number = parseInt(input);
        if (!isNaN(number)) {
          if (selectedList.isEmpty()) {
            console.log("\nList is empty.");
          } else if (!selectedList.peek(number)) {
            console.log("\nElement doesn't exist.");
          } else {
            console.log("\nRemoved " + selectedList.removeAt(number) + " from the list.");
          }
        } else {
          console.log("Invalid input. Please enter a valid number.");
        }
        showListMenu(selectedList, index);
      });
      break;
    case '7':
      selectedList.removeAll();
      console.log("\nList was cleared.");
      showListMenu(selectedList, index);
      break;
    case '8':
      rl.question("Enter the index of element to replace: ", (inputIndex) => {
        const numberIndex = parseInt(inputIndex);
        rl.question("Enter replacing value: ", (inputValue) => {
          const numberValue = parseInt(inputValue);
          if (!isNaN(numberIndex) || !isNaN(numberValue)) {
            if (selectedList.isEmpty()) {
              console.log("\nList is empty.");
            } else if (!selectedList.peek(numberIndex)) {
              console.log("\nElement doesn't exist.");
            } else {
              selectedList.replace(numberValue, numberIndex)
              console.log("\nSuccessfully replaced the value.");
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
        });
      });
      break;
    case '9':
      selectedList.reverse();
      console.log("\nSuccessfully reversed the list.");
      showListMenu(selectedList, index);
      break;
    case '10':
      rl.question("Enter the index of element to insert: ", (inputIndex) => {
        const numberIndex = parseInt(inputIndex);
        rl.question("Enter insertion value: ", (inputValue) => {
          const numberValue = parseInt(inputValue);
          if (!isNaN(numberIndex) || !isNaN(numberValue)) {
            if (numberIndex < 0 || numberIndex > selectedList.getLength()) {
              console.log("\nCan't reach the index.");
            } else {
              selectedList.insertAt(numberValue, numberIndex)
              console.log("\nSuccessfully inserted the value " + numberValue + " in the list.");
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
        });
      });
      break;
    case '11':
      rl.question("Enter the index of element to check: ", (input) => {
        const number = parseInt(input);
        if (!isNaN(number)) {
          if (selectedList.isEmpty()) {
            console.log("\nList is empty.");
          } else if (!selectedList.peek(number)) {
            console.log("\nElement doesn't exist.");
          } else {
            console.log("\nThe stored value in element with index " + number + " is " + selectedList.getValue(number));
          }
        } else {
          console.log("Invalid input. Please enter a valid number.");
        }
        showListMenu(selectedList, index);
      });
      break;
    case '12':
      console.log("The length of the list: " + selectedList.getLength());
      showListMenu(selectedList, index);
      break;
    case '13':
      rl.question("Enter the index of list, which you want to insert: ", (inputList) => {
        const list = parseInt(inputList);
        rl.question("Enter the index of element, where to insert the list: ", (inputIndex) => {
          const number = parseInt(inputIndex);
          if (!isNaN(list) || !isNaN(number)) {
            if (!selectedList.peek(number)) {
              console.log("\nIndex to insert doesn't exist to insert.");
            } else if (!lists[list]) {
              console.log("\nList with this index doesn't exist in program.")
            } else {
              selectedList.insertListAt(lists[list], number);
              console.log("\nSuccessfully inserted list " + list + " in the list.")
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
        });
      });
      break;
    case '14':
      rl.question("Enter the index of list, which you want to append: ", (inputList) => {
        const list = parseInt(inputList);
          if (!isNaN(list)) {
            if (!lists[list]) {
              console.log("\nList with this index doesn't exist in program.")
            } else {
              selectedList.appendList(lists[list]);
              console.log("\nSuccessfully appended list " + list + " in the list.")
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
      });
      break;
    case '15':
      rl.question("Enter the index of list, which you want to prepend: ", (inputList) => {
        const list = parseInt(inputList);
          if (!isNaN(list)) {
            if (!lists[list]) {
              console.log("\nList with this index doesn't exist in program.")
            } else {
              selectedList.prependList(lists[list]);
              console.log("\nSuccessfully prepended list " + list + " in the list.")
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
      });
      break;
    case '16':
      rl.question("Enter the index of the first element: ", (inputX) => {
        const indexX = parseInt(inputX);
        rl.question("Enter the index of element, where to insert the list: ", (inputY) => {
          const indexY = parseInt(inputY);
          if (!isNaN(indexX) || !isNaN(indexY)) {
            if (!selectedList.peek(indexX)) {
              console.log("\nFirst element doesn't exist.");
            } else if (!selectedList.peek(indexY)){
              console.log("\nSecond element doesn't exist.");
            } else {
              selectedList.swap(indexX, indexY);
              console.log("\nSuccessfully swapped elements.");
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
        });
      });
      break;
    case '17':
      rl.question("Enter the index of list, which contains or not in the list: ", (inputList) => {
        const list = parseInt(inputList);
          if (!isNaN(list)) {
            if (!lists[list]) {
              console.log("\nList with this index doesn't exist in program.")
            } else {
              console.log(selectedList.containsList(lists[list]));
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
      });
      break;
    case '18':
      rl.question("Enter the index of list to check it's first entry in the list: ", (inputList) => {
        const list = parseInt(inputList);
          if (!isNaN(list)) {
            if (!lists[list]) {
              console.log("\nList with this index doesn't exist in program.")
            } else {
              console.log("\nFirst entry of list " + list + " in the list at the index: " + selectedList.searchFirstEntry(lists[list]));
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
      });
      break;
    case '19':
      rl.question("Enter the index of list to check it's last entry in the list: ", (inputList) => {
        const list = parseInt(inputList);
          if (!isNaN(list)) {
            if (!lists[list]) {
              console.log("\nList with this index doesn't exist in program.")
            } else {
              console.log("\nLast entry of list " + list + "in the list at the index: " + selectedList.searchLastEntry(lists[list]));
            }
          } else {
            console.log("Invalid input. Please enter a valid number.");
          }
          showListMenu(selectedList, index);
      });
      break;
    case 'e':
      console.log("Exiting the list menu.");
      showMenu();
      break;
    case 'p':
      lists[index]?.printList();
      showListMenu(selectedList, index);
      break;
    default:
      console.log("Invalid choice. Please select a valid option.");
      showListMenu(selectedList, index);
  }
}

// Function to display the menu for a selected list
function showListMenu(selectedList: LinkedList, index: number) {
  console.log(
    "\n Selected (list " + index +") menu.\n",
    "Type 'e' to exit to the main menu\n",
    "Type 'p' to print the list\n\n",
    "1. Append element\n",
    "2. Prepend element\n",
    "3. Check if list is empty\n",
    "4. Delete last element\n",
    "5. Delete first element\n",
    "6. Delete element by index\n",
    "7. Delete list\n",
    "8. Replace element by index\n",
    "9. Reverse list\n",
    "10. Insert element by index\n",
    "11. Get element's data by index\n",
    "12. Get length of the list\n",
    "13. Insert list by index\n",
    "14. Append list\n",
    "15. Prepend list\n",
    "16. Swap elements by indexes\n",
    "17. Check if list contains another list\n",
    "18. Return list's first entry in another list\n",
    "19. Return list's last entry in another list\n\n",
  );

  rl.question("Enter the command: ", (choice) => {
    performListAction(selectedList, choice, index);
  });
}

// Function to display the main menu
function showMenu() {
  console.log(
    "\n Main menu.\n",
    "Type e to exit\n\n",
    "1. Create a new list\n",
    "2. Select a list by index\n",
  );

  rl.question("Enter the command: ", (choice) => {
    switch (choice) {
      case '1':
        createNewList();
        showMenu();
        break;
      case '2':
        selectList();
        break;
      case 'e':
        console.log("Exiting the program.");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please select a valid option.");
        showMenu();
    }
  });
}

showMenu();

rl.on('close', () => {
  console.log("Goodbye!");
  process.exit(0);
});