const mongoose = require('mongoose')

//string connection
mongoose.connect("mongodb://localhost:27017/booksandco_server",{
    useNewUrlParser:true  
})

//model defining
const User=mongoose.model('User',{
    username:String,
    email:String,
    phone:String,
    password:String
})

const Books=mongoose.model('Books',{
   "items":[
    {
        kind: String,
        id: String,
        etag: String,
        selfLink: String,
        volumeInfo: {
          title: String,
          authors: [String],
          publisher: String,
          publishedDate: String,
          description: String,
          industryIdentifiers: [
            {
              type: String,
              identifier: String,
            },
          ],
          readingModes: {
            text: Boolean,
            image: Boolean,
          },
          pageCount: Number,
          printType: String,
          categories: [String],
          averageRating: Number,
          ratingsCount: Number,
          maturityRating: String,
          allowAnonLogging: Boolean,
          contentVersion: String,
          panelizationSummary: {
            containsEpubBubbles: Boolean,
            containsImageBubbles: Boolean,
          },
          imageLinks: {
            smallThumbnail: String,
            thumbnail: String,
          },
          language: String,
          previewLink: String,
          infoLink: String,
          canonicalVolumeLink: String,
        },
        saleInfo: {
          country: String,
          saleability: String,
          isEbook: Boolean,
          listPrice: {
            amount: Number,
            currencyCode: String,
          },
          retailPrice: {
            amount: Number,
            currencyCode: String,
          },
          buyLink: String,
          offers: [
            {
              finskyOfferType: Number,
              listPrice: {
                amountInMicros: Number,
                currencyCode: String,
              },
              retailPrice: {
                amountInMicros: Number,
                currencyCode: String,
              },
            },
          ],
        },
        accessInfo: {
          country: String,
          viewability: String,
          embeddable: Boolean,
          publicDomain: Boolean,
          textToSpeechPermission: String,
          epub: {
            isAvailable: Boolean,
            acsTokenLink: String,
          },
          pdf: {
            isAvailable: Boolean,
            acsTokenLink: String,
          },
          webReaderLink: String,
          accessViewStatus: String,
          quoteSharingAllowed: Boolean,
        },
        searchInfo: {
          textSnippet: String,
        },     

    }
   ]
       })

//exporting
module.exports={
    User,
    Books
}