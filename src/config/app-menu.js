const Menu = [
  { path: '/', icon: 'fa-solid fa-house', title: 'หน้าแรก' },

  { path: '/settings', icon: 'fa fa-cog', title: 'ตั้งค่า',
    children: [
      { path: '/settings/perm', title: 'สิทธิ์การใช้งาน'},
      { path: '/settings/users', title: 'ผู้ใช้งาน' },
      { path: '/settings/test', title: 'เทส' },
    ]
  }

]

export default Menu;