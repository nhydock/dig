/// <reference path='../Core/Common.ts'/>

namespace Digdown.UI {
    import log = Core.log;

    export class Main {
       
        private game = new Game();
                
        private wrapper: HTMLDivElement = <HTMLDivElement>document.getElementById('#wrapper');
        private tooltip: HTMLDivElement = <HTMLDivElement>document.getElementById('#tooltip');
        private gameScreen: HTMLDivElement = <HTMLDivElement>document.getElementById('#gameScreen');
        private progCursor: HTMLDivElement = <HTMLDivElement>document.getElementById('#progCursor');    
        
        private moneyDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('#money');
        private mainContent: HTMLDivElement = $('#inventory > .content');
        private subContent: HTMLDivElement = $('#econList > .content');
        
        private toolsTab: HTMLLIElement = <HTMLLIElement>document.getElementById('#tools');
        private itemsTab: HTMLLIElement = <HTMLLIElement>document.getElementById('#items');
        private econTab: HTMLLIElement = <HTMLLIElement>document.getElementById('#econ');
        private techTab: HTMLLIElement = <HTMLLIElement>document.getElementById('#tech');
        private busiTab: HTMLLIElement = <HTMLLIElement>document.getElementById('#busi');

        private toolBoxList: HTMLDivElement = <HTMLDivElement>document.getElementById('#toolsList');
        private itemBoxList: HTMLDivElement = <HTMLDivElement>document.getElementById('#itemsList');
        private econBoxList: HTMLDivElement = <HTMLDivElement>document.getElementById('#econList');
        private techBoxList: HTMLDivElement = <HTMLDivElement>document.getElementById('#techList');
        private busiBoxList: HTMLDivElement = <HTMLDivElement>document.getElementById('#busiList');
        
        constructor() {
            log("Game has begun");

            var tools = this.game.ToolsInventory.Tools;
            for (var t in tools) {
                let box = new ToolBox(this.game, tools[t]);
                this.toolBoxList.appendChild(box.ToolBox);
            }

            var items = this.game.ItemsInventory.Items;
            for (var i in items) {
                let box = new ItemBox(this.game, items[i]);
                this.itemBoxList.appendChild(box.ItemBox);
            }
            
            var techs = this.game.TechnologyTree.Technologies;
            for (var h in techs) {
                let box = new ToolBox(this.game, tools[i]);
                this.toolBoxList.appendChild(box.ToolBox);
            }

            this.toolsTab.click = this.changeTab(this.toolsTab, this.toolBoxList);
            this.itemsTab.click = this.changeTab(this.itemsTab, this.itemBoxList);            
            this.econTab.click = this.changeTab(this.econTab, this.econBoxList);            
            this.techTab.click = this.changeTab(this.techTab, this.techBoxList);            
            this.busiTab.click = this.changeTab(this.busiTab, this.busiBoxList);

            this.game.setFontSize(this.gameScreen.style.fontSize);
            
            window.onresize = this.onResizeFunc;
            this.onResizeFunc();
            
            this.gameScreen.innerHTML = this.game.printVisibleGrid();

            this.updateMoney(this.game.Money);
            this.game.addMoneyListener(this.updateMoney);
            this.gameScreen.onmousemove = this.updateHover;
            this.gameScreen.onmouseleave = this.hideTooltip;

            this.techTab.click();
            this.toolsTab.click();
        }

        updateMoney(money: number) {
            this.moneyDiv.textContent = '$ ' + money
        }
        
        updateHover(event: MouseEvent) {
            var x = event.pageX - this.offsetLeft;
            var y = event.pageY - this.offsetTop;
            
            var w = this.gameScreen.width();
            var h = this.gameScreen.height();
            
            var hoverText = this.game.getHoverText(x, y);
            if (hoverText === null)
            {
                this.hideTooltip();
                return;
            }
            
            this.tooltip.innerHTML = this.game.getHoverText(x, y);
            this.tooltip.style.top = (event.pageY+2)+'px';
            this.tooltip.style.left = (event.pageX+2)+'px';
            this.tooltip.style.display = 'block';
        }

        private hideTooltip() {
            this.tooltip.style.display = 'none';
        }
        
        private changeTab(tab: HTMLLIElement, list: HTMLDivElement) {
            return function() {
                var parent = tab.parent().parent();
                
                var select = parent.children('.tabs').find('li.selected').first();
                if (select === tab)
                    return;
                
                var content = parent.children('.content').first();
                content.children().hide();
                list.show();
                
                select.removeClass('selected');
                tab.addClass('selected');
            }
        }

        private onResizeFunc() {
            this.wrapper.style.height = window.innerHeight + 'px';
            this.game.setViewHeight(this.gameScreen.height());
        }
        
        // keycodes found here http://www.javascriptkeycode.com/
        private onKeyDownFunc(event: KeyboardEvent) {
            if (event.which == 37)          // left arrow
                this.game.moveLeft();
            if (event.which == 38)          // up arrow
                this.game.moveUp();
            if (event.which == 39)          // right arrow
                this.game.moveRight();
            if (event.which == 40)          // down arrow
                this.game.moveDown();

            this.gameScreen.innerHTML = this.game.printVisibleGrid(); 
            this.progCursor.style.top = this.game.Progress + '%';        
        }
    }
}