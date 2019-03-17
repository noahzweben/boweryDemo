import { createBrowserHistory } from 'history';

/*
helper method for history. Allows access
to navigation methods throughought app
as well as fixes a scrolling bug often present
in single page applications 
*/
var history = createBrowserHistory();
history.listen((location, action) => {
  window.scrollTo(0, 0);
});

export default history;
