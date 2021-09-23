class Animation{
	constructor(text){

		this.text = text;
		this.elem = document.createElement('p');
		this.elem.id = 'Animation'
		document.body.append(this.elem);
		this.elem.innerHTML = text;
		this.elem_marg = 100;
		this.elem_opp = 0;
		this.elem.style.marginLeft = `${this.elem_marg}%`;
		this.elem.style.opacity = `${this.elem_opp}`;
		this.elem_shot();

	}

	elem_shot(){

		let div_elem_top = document.createElement('div');
		let div_elem_bottom = document.createElement('div');

		let prom = new Promise((resolve, reject) =>{
			let interval_elem_shot = setInterval(() => {

				this.elem_opp += 0.01;
				this.elem_marg -= 1;
				this.elem.style.marginLeft = `${this.elem_marg}%`;
				this.elem.style.opacity = `${this.elem_opp}`;

				if (this.elem_opp >= 1 && this.elem_marg <= 0) {
					clearInterval(interval_elem_shot);
					resolve();
				}

			}, 10);
		});
		prom.then(() =>{ 
				return new Promise((resolve, reject) => {

					
					this.elem.before(div_elem_top);
					this.elem.after(div_elem_bottom);

					let i = 0;

					let word_to_crush = setInterval(() => {

						if (i == 0) {

							let elem_word = document.createElement('p');
							elem_word.classList.add('top');
							elem_word.innerHTML = this.elem.innerHTML[0];
							this.elem.innerHTML = this.elem.innerHTML.replace(this.elem.innerHTML[0], '');
							div_elem_top.append(elem_word);
							i = 1;

							if (this.elem.innerHTML == '') elem_word.id = 'last';


						} else if (i == 1) {

							let elem_word = document.createElement('p');
							elem_word.classList.add('bottom');
							elem_word.innerHTML = this.elem.innerHTML[0];
							this.elem.innerHTML = this.elem.innerHTML.replace(this.elem.innerHTML[0], '');					
							div_elem_bottom.prepend(elem_word);
							i = 0;

							if (this.elem.innerHTML == '') elem_word.id = 'last';


						}

						if (this.elem.innerHTML == '') {
							clearInterval(word_to_crush);
							resolve();
						}

					}, 100);

			});
		}).then(() => {

				return new Promise((resolve, reject) => {

					
					let last_elem = document.getElementById('last');
					this.elem.prepend(last_elem.innerHTML);

					let i;
					if (last_elem.classList == 'top') i = 1;
					else if (last_elem.classList == 'bottom') i = 0;
					last_elem.remove();
					

					let elem_to_contain = setInterval(() => {

						
						let elems_p_top = document.getElementsByClassName('top');
						let elems_p_bottom = document.getElementsByClassName('bottom');

						if (i == 0) {

							this.elem.prepend(elems_p_top[elems_p_top.length-1].innerHTML);
							elems_p_top[elems_p_top.length-1].remove();
							i = 1;
							
						} else if (i == 1){

							this.elem.prepend(elems_p_bottom[elems_p_bottom.length-1].innerHTML);
							elems_p_bottom[elems_p_bottom.length-1].remove();
							i = 0;
							

						}

						if (elems_p_top.length == 0 && elems_p_bottom.length == 0) {

							div_elem_top.remove();
							div_elem_bottom.remove();
							clearInterval(elem_to_contain);
							resolve();

						}

					}, 100);

				});

		}).then(() => {

			return new Promise((resolve, reject) => {

				let elem_out = setInterval(() => {

				this.elem_opp -= 0.01;
				this.elem_marg += 1;
				this.elem.style.marginLeft = `${this.elem_marg}%`;
				this.elem.style.opacity = `${this.elem_opp}`;

				if (this.elem_opp <= 1 && this.elem_marg >= 0) {
					clearInterval(interval_elem_shot);
					resolve();
				}	

				}, 10);

			});

		});
	}

}

document.addEventListener('DOMContentLoaded', new Animation('text'));