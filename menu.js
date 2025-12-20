//THREE DOT MENU JS


const trigger = document.getElementById('menuTrigger');
    const panel = document.getElementById('threeDotPanel');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    function openMenu(){
      trigger.classList.add('open');
      panel.classList.add('open');
      overlay.classList.add('open');
      trigger.setAttribute('aria-expanded','true');
      // move focus into panel for accessibility
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    }
    function closeMenu(){
      trigger.classList.remove('open');
      panel.classList.remove('open');
      overlay.classList.remove('open');
      trigger.setAttribute('aria-expanded','false');
      trigger.focus();
      document.body.style.overflow = '';
    }

    //sublist function for characters
    function togglelist(){
      const characterlist = document.getElementById("characterlist");
      if (list.style.display === "none") {
        list.style.display = "block";
      } else {
        characterlist.style.display = "none";
      }
    }

    trigger.addEventListener('click', ()=>{
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      if(expanded) closeMenu(); else openMenu();
    });

    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // close on ESC
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && panel.classList.contains('open')) closeMenu();
    });

    // close when focus leaves panel (optional small enhancement)
    document.addEventListener('focusin', (e)=>{
      if(panel.classList.contains('open')){
        const inside = panel.contains(e.target) || trigger.contains(e.target);
        if(!inside) closeMenu();
      }

    });
