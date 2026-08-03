self.addEventListener('push', event => {
  let data = {};
  try{ data = event.data ? event.data.json() : {}; }
  catch(e){ data = {title:'Sugar Log', body: event.data ? event.data.text() : 'Time to check your blood sugar'}; }
  const title = data.title || 'Sugar Log';
  const body = data.body || 'Time to check your blood sugar 🩸';
  event.waitUntil(self.registration.showNotification(title, { body, tag:'sugar-reminder', renotify:true, vibrate:[200,100,200] }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window'}).then(list=>{
    for(const c of list){ if('focus' in c) return c.focus(); }
    if(clients.openWindow) return clients.openWindow('./');
  }));
});
