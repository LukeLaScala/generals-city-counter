// Saves options to chrome.storage.sync
function save_options() {
  chrome.storage.sync.set({
    numTurns: document.getElementById('numTurns').value,
    showAllChanges: document.getElementById('showAllChanges').checked,
    useCountDown: document.getElementById('useCountDown').checked
  }, function() {
    document.getElementById('status').textContent = 'Options saved.';
    setTimeout(function() {
      document.getElementById('status').textContent = '';
    }, 750);
  });
}

// Restores state using the preferences stored in chrome.storage
function restore_options() {
  chrome.storage.sync.get({
    numTurns: 10,
    showAllChanges: false,
    useCountDown: false
  }, function(items) {
    document.getElementById('numTurns').value = items.numTurns;
    document.getElementById('showAllChanges').checked = items.showAllChanges;
    document.getElementById('useCountDown').checked = items.useCountDown;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
