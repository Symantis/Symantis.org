//AccessService.js

module.exports = {

    checkAccessArea: function(isAuthenticated, route) {
        var requiresAccess = [
            '/me', 
            '/me/*', 
            //'/community/queries/new',
            //'/community/board/new'
        ];
        var access = true;
        
        for(var i in requiresAccess){
        	//console.log(route);
            if(route.regex.test(requiresAccess[i])){
                access = false;
            }
            /*
            if(route.indexOf(requiresAccess[i]) > -1){
        		access = false;
        	}
            */
        }

        if(!isAuthenticated && !access){
            return false; 
        }
        return true;
    }
};