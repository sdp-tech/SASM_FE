export default function PageRedirection(navigate, title){
  const urlHash = {
    'SASM': '',
    'MAP': 'map',
    'STORY': 'story',
    'MY PICK': 'mypage',
    'LOG IN': 'auth',
    'JOIN': 'auth/register'
  }

  navigate('/'+urlHash[title])
}