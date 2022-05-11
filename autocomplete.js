function TrieNode(key) {
    this.key = key
    this.parent = null
    this.children = {}
    this.end = false //à la place de l'étoile j'ai mis un flag pour déterminer la fin d'un mot
}

function searchAllWords(node, array) {
    if (node.end) {
        array.unshift(node.getWord())
    }

    //on itére sur chaque enfant, puis on appelle searchAllWords de manière récursive
    for (let child in node.children) {
        searchAllWords(node.children[child], array)
    }
}
  
//Parcours le noeud parent pour trouver le mot
TrieNode.prototype.getWord = function() {
    let output = []
    let node = this

    while (node !== null) {
        output.unshift(node.key)
        node = node.parent
    }

    return output.join('')
}

//on implémente Trie avec une simple racine à valeur nulle
function Trie() {
    this.root = new TrieNode(null)
}
  
//Insére un mot
Trie.prototype.insert = function(word) {
    let node = this.root
    
    for(let i = 0; i < word.length; i++) {
        //vérifier si le caractère existe parmi les enfants
        if (!node.children[word[i]]) {
        //s'il n'existe pas on le crée
            node.children[word[i]] = new TrieNode(word[i])
        
        //nous attribuons également le parent au nœud enfant
            node.children[word[i]].parent = node
        }
      
        //on passe à la profondeur suivante
        node = node.children[word[i]]
      
        //puis on fait un check pour voir si c'est la fin du mot
        if (i == word.length-1) {
            //si c'est le cas le flag "end" passe à true
            node.end = true
        }
    }
}
  
//retourne tous les mots commençant par le préfixe "word"
Trie.prototype.search = function(word) {
    let node = this.root
    let output = []

    for(let i = 0; i < word.length; i++) {
        //on check si ce préfixe à des mots existant dans l'arbre
        if (node.children[word[i]]) {
        node = node.children[word[i]]
        } else {
        //lorsqu'il y en a pas on retourne "null"
        return null
        }
    }

    //on rappelle la méthode pour parcourir tout l'arbre
    searchAllWords(node, output)

    return output
}

//retourne tous les mots existant dans l'arbre
Trie.prototype.collectAllWords = function(node) {
    let words = []
    searchAllWords(node,words)
    return words
}

//on initialise l'arbre
let trie = new Trie()

//on teste la méthode "insert"
trie.insert("bat")
trie.insert("popcorn")
trie.insert("battle")
trie.insert("butter")

//on teste la méthode "search"
console.log(trie.search("ba"))
console.log(trie.search("batt"))

//on teste la méthode "collectAllWords"
console.log(trie.collectAllWords(trie.root))

  