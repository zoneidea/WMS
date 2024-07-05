const Menu = [
  { path: '/', icon: 'fa-solid fa-house', title: 'หน้าแรก' },

  { path: '/settings', icon: 'fa-solid fa-gear', title: 'ตั้งค่า',
    children: [
      { path: '/settings/permission', title: 'สิทธิ์การใช้งาน'},
      { path: '/settings/users', title: 'ผู้ใช้งาน' },
    ]
  }

]

export default Menu;