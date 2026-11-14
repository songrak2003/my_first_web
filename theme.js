// 라이트/다크 모드 전환 (3개의 html 페이지가 함께 사용)
// - <head> 에서 불러와서, 화면이 그려지기 전에 테마를 정해 깜빡임을 막습니다.
// - 선택한 모드는 브라우저에 저장되어 다음에 열어도 유지됩니다.
// - 저장된 값이 없으면 컴퓨터의 다크모드 설정을 따라갑니다.
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', load() || (prefersDark ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.className = 'theme-switch';
    btn.type = 'button';
    btn.setAttribute('role', 'switch');
    btn.innerHTML = '<span class="knob"></span>';
    document.body.insertBefore(btn, document.body.firstChild);

    function sync() {
      var dark = root.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-checked', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기');
      btn.title = dark ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기';
    }
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      save(next);
      sync();
    });
    sync();
  });
})();
